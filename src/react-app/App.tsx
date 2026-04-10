// src/App.tsx

import './App.css'
import { useEffect, useState, type ReactNode } from 'react'

type NowPlaying = {
  isPlaying: boolean
  title: string
  artist: string
  cover: string
  url: string
}

type SocialLink = {
  label: string
  href: string
  accent: string
  icon: ReactNode
}

const profile = {
  name: 'kintetik',
  handle: '@xeacx',
  subtitle: 'гений • манипулятор • хз кто еще',
  avatar: '',
}

const links: SocialLink[] = [
  {
    label: 'Telegram',
    href: 'https://t.me/kintetik',
    accent: 'Аккаунт',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21.5 4.5 18.4 19c-.2 1-.8 1.2-1.6.8l-4.7-3.5-2.2 2.1c-.2.2-.4.4-.9.4l.3-4.8 8.8-8c.4-.3-.1-.5-.5-.2L6.7 12.7 2 11.2c-1-.3-1-1 .2-1.4L20 3c.9-.3 1.7.2 1.5 1.5Z" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@kintetik',
    accent: 'Аккаунт',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M15.2 3c.3 1.8 1.3 3.2 2.9 4.1 1 .6 2 .9 2.9 1v2.7c-1.5 0-3-.4-4.4-1.2v5.3a5.8 5.8 0 1 1-5.8-5.8h.4v2.8h-.4a3 3 0 1 0 3 3V3h1.4Z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@kintetik',
    accent: 'Аккаунт',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21.6 7.2a2.9 2.9 0 0 0-2-2C17.8 4.7 12 4.7 12 4.7s-5.8 0-7.6.5a2.9 2.9 0 0 0-2 2A30 30 0 0 0 2 12a30 30 0 0 0 .4 4.8 2.9 2.9 0 0 0 2 2c1.8.5 7.6.5 7.6.5s5.8 0 7.6-.5a2.9 2.9 0 0 0 2-2A30 30 0 0 0 22 12a30 30 0 0 0-.4-4.8ZM10 15.5v-7l6 3.5-6 3.5Z" />
      </svg>
    ),
  },
  {
    label: 'Discord',
    href: 'https://discord.com/users/1321448370287677444',
    accent: 'Аккаунт',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19.2 5.4a15.7 15.7 0 0 0-3.8-1.2l-.2.5c1.5.4 2.2 1 2.7 1.4a14.8 14.8 0 0 0-5.9-1.1 14.8 14.8 0 0 0-5.9 1.1c.5-.4 1.2-1 2.7-1.4L8.6 4a15.7 15.7 0 0 0-3.8 1.2C2.4 8.8 1.9 12.3 2.2 15.7a15.4 15.4 0 0 0 4.7 2.4l1.1-1.7c-.8-.3-1.5-.7-2.1-1.1l.5-.4c1.8.9 3.8 1.3 5.6 1.3 1.8 0 3.8-.4 5.6-1.3l.5.4c-.6.4-1.3.8-2.1 1.1l1.1 1.7a15.4 15.4 0 0 0 4.7-2.4c.4-4-.7-7.4-2.6-10.3ZM9.5 13.8c-.8 0-1.4-.7-1.4-1.5s.6-1.5 1.4-1.5 1.4.7 1.4 1.5-.6 1.5-1.4 1.5Zm5 0c-.8 0-1.4-.7-1.4-1.5s.6-1.5 1.4-1.5 1.4.7 1.4 1.5-.6 1.5-1.4 1.5Z" />
      </svg>
    ),
  },
  {
    label: 'Reddit',
    href: 'https://www.reddit.com/user/kintetik',
    accent: 'Аккаунт',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14.5 8.4 15.2 5l2.3.5a1.7 1.7 0 1 0 .2-1l-2.8-.6a.8.8 0 0 0-.9.6l-.8 3.5c-.4 0-.8-.1-1.2-.1-1.7 0-3.2.4-4.4 1.1a2.1 2.1 0 0 0-3 .1 2.1 2.1 0 0 0 .2 3 3.8 3.8 0 0 0-.1.9c0 2.9 3.2 5.2 7.2 5.2s7.2-2.3 7.2-5.2c0-.3 0-.6-.1-.9a2.1 2.1 0 0 0 .2-3 2.1 2.1 0 0 0-3.1-.1 8.3 8.3 0 0 0-3.6-1Zm-5 4.7a1 1 0 1 1 0-2.1 1 1 0 0 1 0 2.1Zm5.8 2.2c-.8.5-1.8.8-3.3.8s-2.5-.3-3.3-.8a.6.6 0 1 1 .7-1c.6.4 1.4.6 2.6.6s2-.2 2.6-.6a.6.6 0 1 1 .7 1Zm-.8-2.2a1 1 0 1 1 0-2.1 1 1 0 0 1 0 2.1Z" />
      </svg>
    ),
  },
  {
    label: 'Spotify',
    href: 'https://open.spotify.com/31yx5ntfrmiiqseeazzr3egarsda?si=8cefda08d3b040e7',
    accent: 'Аккаунт',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.2a9.8 9.8 0 1 0 0 19.6 9.8 9.8 0 0 0 0-19.6Zm4.5 14.1a.7.7 0 0 1-1 .2c-2.6-1.5-5.8-1.8-9.6-1a.7.7 0 1 1-.3-1.4c4.1-.8 7.7-.4 10.6 1.2.4.2.5.7.3 1Zm1.3-3a.9.9 0 0 1-1.1.3c-3-1.7-7.4-2.2-10.9-1.2a.9.9 0 1 1-.5-1.7c3.9-1 8.8-.5 12.1 1.4.5.3.7.8.4 1.2Zm.1-3.2c-3.5-2-9.3-2.2-12.5-1.2a1.1 1.1 0 1 1-.6-2.1c3.8-1.1 10-.8 14 1.5a1.1 1.1 0 0 1-1 1.8Z" />
      </svg>
    ),
  },
]

const fallbackTrack: NowPlaying = {
  isPlaying: false,
  title: 'Сейчас ничего не слушает',
  artist: 'Spotify',
  cover: '',
  url: 'https://open.spotify.com/',
}

function App() {
  const [nowPlaying, setNowPlaying] = useState<NowPlaying>(fallbackTrack)

  useEffect(() => {
    let active = true

    const loadNowPlaying = async () => {
      try {
        const response = await fetch('/api/now-playing', {
          headers: {
            Accept: 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error('Failed to load now playing')
        }

        const data = (await response.json()) as NowPlaying

        if (!active) return

        setNowPlaying({
          isPlaying: data.isPlaying,
          title: data.title,
          artist: data.artist,
          cover: data.cover,
          url: data.url,
        })
      } catch {
        if (!active) return
        setNowPlaying(fallbackTrack)
      }
    }

    loadNowPlaying()
    const intervalId = window.setInterval(loadNowPlaying, 10000)

    return () => {
      active = false
      window.clearInterval(intervalId)
    }
  }, [])

  return (
    <main className="page-shell">
      <div className="page-glow page-glow-left" />
      <div className="page-glow page-glow-right" />

      <section className="profile-card">
        <div className="card-head">
          <div className="avatar-frame">
            {profile.avatar ? (
              <img className="avatar-image" src={profile.avatar} alt={profile.name} />
            ) : (
              <span className="avatar-fallback">{profile.name[0].toUpperCase()}</span>
            )}
          </div>

          <div className="identity-block">
            <h1>{profile.name}</h1>
            <p className="handle">{profile.handle}</p>
            <p className="subtitle">{profile.subtitle}</p>
          </div>
        </div>

        <a
          className={`now-playing-card ${nowPlaying.isPlaying ? 'is-playing' : 'is-idle'}`}
          href={nowPlaying.url}
          target="_blank"
          rel="noreferrer"
        >
          <div className="track-cover">
            {nowPlaying.cover ? (
              <img src={nowPlaying.cover} alt={nowPlaying.title} />
            ) : (
              <div className="cover-fallback">
                <span>♪</span>
              </div>
            )}
          </div>

          <div className="track-copy">
            <span className="track-label">
              {nowPlaying.isPlaying ? 'Сейчас слушает' : 'Spotify'}
            </span>
            <strong>{nowPlaying.title}</strong>
            <span>{nowPlaying.artist}</span>
          </div>

          <div className="track-status">
            <span className="pulse" />
            <span>{nowPlaying.isPlaying ? 'live' : 'idle'}</span>
          </div>
        </a>

        <div className="social-list">
          {links.map((link) => (
            <a
              key={link.label}
              className="social-link"
              href={link.href}
              target="_blank"
              rel="noreferrer"
            >
              <div className="social-icon">{link.icon}</div>

              <div className="social-copy">
                <strong>{link.label}</strong>
                <span>{link.accent}</span>
              </div>
            </a>
          ))}
        </div>
      </section>
      <footer className="site-footer">
        © 2026 kintetik. All rights reserved.
      </footer>
    </main>
  )
}

export default App
