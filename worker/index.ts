export interface Env {
  SPOTIFY_CLIENT_ID: string;
  SPOTIFY_CLIENT_SECRET: string;
  SPOTIFY_REFRESH_TOKEN: string;
}

type SpotifyTokenResponse = {
  access_token: string;
};

type SpotifyArtist = {
  name: string;
};

type SpotifyImage = {
  url: string;
};

type SpotifyTrack = {
  name: string;
  artists: SpotifyArtist[];
  album: {
    images: SpotifyImage[];
  };
  external_urls: {
    spotify: string;
  };
};

type SpotifyCurrentlyPlayingResponse = {
  is_playing: boolean;
  item: SpotifyTrack | null;
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Cache-Control": "no-store",
};

async function getAccessToken(env: Env) {
  const basic = btoa(`${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`);

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: env.SPOTIFY_REFRESH_TOKEN,
    }),
  });

  if (!response.ok) {
    throw new Error(`Spotify token error: ${response.status}`);
  }

  const data = (await response.json()) as SpotifyTokenResponse;
  return data.access_token;
}

async function getNowPlaying(env: Env) {
  const accessToken = await getAccessToken(env);

  const response = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (response.status === 204) {
    return {
      isPlaying: false,
      title: "Сейчас ничего не играет",
      artist: "Spotify не вернул активный трек",
      cover: "",
      url: "#",
    };
  }

  if (!response.ok) {
    throw new Error(`Spotify now-playing error: ${response.status}`);
  }

  const data = (await response.json()) as SpotifyCurrentlyPlayingResponse;
  const track = data.item;

  if (!track) {
    return {
      isPlaying: false,
      title: "Трек не найден",
      artist: "Spotify не вернул данные по треку",
      cover: "",
      url: "#",
    };
  }

  return {
    isPlaying: data.is_playing,
    title: track.name,
    artist: track.artists.map((artist) => artist.name).join(", "),
    cover: track.album.images[0]?.url ?? "",
    url: track.external_urls.spotify,
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);

    if (url.pathname !== "/api/now-playing") {
      return new Response("Not found", { status: 404, headers: corsHeaders });
    }

    try {
      const payload = await getNowPlaying(env);

      return Response.json(payload, {
        headers: corsHeaders,
      });
    } catch (error) {
      console.error(error);

      return Response.json(
        {
          isPlaying: false,
          title: "Spotify недоступен",
          artist: "Попробуй обновить страницу позже",
          cover: "",
          url: "#",
        },
        {
          headers: corsHeaders,
        },
      );
    }
  },
};
