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
    href: 'https://t.me/your_username',
    accent: 'мой акк в тг',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21.5 4.5 18.4 19c-.2 1-.8 1.2-1.6.8l-4.7-3.5-2.2 2.1c-.2.2-.4.4-.9.4l.3-4.8 8.8-8c.4-.3-.1-.5-.5-.2L6.7 12.7 2 11.2c-1-.3-1-1 .2-1.4L20 3c.9-.3 1.7.2 1.5 1.5Z" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@your_username',
    accent: 'мой акк в тт',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14 3c.4 1.9 1.5 3.4 3 4.3 1 .6 2.1 1 3 1.1v3.2c-1.6 0-3.3-.5-4.8-1.4v5.4a6 6 0 1 1-6-6c.3 0 .6 0 .8.1V13a3 3 0 1 0 2.9 3V3H14Z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@your_username',
    accent: 'мой акк в ют',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21.6 7.2a2.9 2.9 0 0 0-2-2C17.8 4.7 12 4.7 12 4.7s-5.8 0-7.6.5a2.9 2.9 0 0 0-2 2A30 30 0 0 0 2 12a30 30 0 0 0 .4 4.8 2.9 2.9 0 0 0 2 2c1.8.5 7.6.5 7.6.5s5.8 0 7.6-.5a2.9 2.9 0 0 0 2-2A30 30 0 0 0 22 12a30 30 0 0 0-.4-4.8ZM10 15.5v-7l6 3.5-6 3.5Z" />
      </svg>
    ),
  },
  {
    label: 'Discord',
    href: 'https://discord.com/users/your_id',
    accent: 'мой акк в дс',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19.5 5.7A16.7 16.7 0 0 0 15.4 4l-.2.4c1.5.4 2.2 1 2.8 1.5a15.7 15.7 0 0 0-6-1.1c-2 0-4 .4-6 1.1.6-.5 1.3-1 2.8-1.5L8.6 4c-1.5.2-2.9.8-4.1 1.7C2 9.3 1.4 12.8 1.7 16.3c1.6 1.2 3.1 2 4.6 2.5l1.1-1.8c-.8-.3-1.5-.7-2.2-1.2l.5-.4c2 1 4 1.4 6.3 1.4 2.2 0 4.3-.5 6.2-1.4l.6.4c-.6.5-1.4 1-2.2 1.2l1.1 1.8c1.5-.5 3-1.3 4.6-2.5.4-4-.7-7.5-2.8-10.6ZM9.5 14.3c-.8 0-1.4-.7-1.4-1.6s.6-1.6 1.4-1.6c.8 0 1.5.7 1.4 1.6 0 .9-.6 1.6-1.4 1.6Zm5 0c-.8 0-1.4-.7-1.4-1.6s.6-1.6 1.4-1.6c.8 0 1.5.7 1.4 1.6 0 .9-.6 1.6-1.4 1.6Z" />
      </svg>
    ),
  },
  {
    label: 'Reddit',
    href: 'https://www.reddit.com/user/your_username',
    accent: 'мой акк в реддит',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14.7 8.2 15.5 5l2.2.5a1.7 1.7 0 1 0 .3-1.2l-2.8-.7a.7.7 0 0 0-.9.5l-1 3.8A8.8 8.8 0 0 0 12 8c-1 0-2 .1-3 .4l-1-3.8a.7.7 0 0 0-.8-.5l-2.8.7a1.7 1.7 0 1 0 .3 1.2L7 5l.8 3.2A5.9 5.9 0 0 0 4 13c0 3 3.6 5.4 8 5.4s8-2.4 8-5.4a5.9 5.9 0 0 0-5.3-4.8ZM8.7 12.8a1.1 1.1 0 1 1 0-2.3 1.1 1.1 0 0 1 0 2.3Zm6.8 2.7c-.8.8-2 1.2-3.5 1.2s-2.7-.4-3.5-1.2a.7.7 0 1 1 1-1c.5.5 1.4.8 2.5.8s2-.3 2.5-.8a.7.7 0 1 1 1 1Zm-.2-2.7a1.1 1.1 0 1 1 0-2.3 1.1 1.1 0 0 1 0 2.3Z" />
      </svg>
    ),
  },
  {
    label: 'Spotify',
    href: 'https://open.spotify.com/',
    accent: 'мой акк в спотике',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.6 14.4a.8.8 0 0 1-1 .2c-2.6-1.6-5.9-2-9.8-1.2a.8.8 0 1 1-.3-1.6c4.3-.8 7.9-.4 10.9 1.4.4.2.5.8.2 1.2Zm1.4-3.1a1 1 0 0 1-1.2.3c-3-1.8-7.6-2.3-11.1-1.3a1 1 0 0 1-.5-1.8c4-.9 9-.4 12.6 1.6.5.2.7.9.2 1.2Zm.1-3.3c-3.6-2.1-9.6-2.3-13-1.3a1.2 1.2 0 1 1-.7-2.3c4-.9 10.6-.7 14.9 1.8a1.2 1.2 0 0 1-1.2 2Z" />
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

              <span className="social-arrow">↗</span>
            </a>
          ))}
        </div>
      </section>
    </main>
  )
}

export default App
