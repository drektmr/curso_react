import React from 'react'
import './App.css'
import { TwitterFollowCard } from './components/TwitterFollowCard'
const users = [
  {
    userName: "drektmr",
    name: "Denis Duran",
    isFollowing: true
  },
  {
    userName: "alsina.creative",
    name: "Alex Alsina",
    isFollowing: false
  }
] 
export function App(){
  return (
    <section className='tw-FollowCard-container'>
      {
        users.map(({ userName, name, isFollowing }) => (
            <TwitterFollowCard
            key={userName}
            userName={userName}
            initialIsFollowing={isFollowing}>
              {name}
            </TwitterFollowCard>
        ))
      }
    </section>
  )
}