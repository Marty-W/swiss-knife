import React, { ReactElement, useEffect } from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import { GoLightBulb } from 'react-icons/go'
import { GiLighthouse } from 'react-icons/gi'
import { BsCardText } from 'react-icons/bs'
import { motion, useAnimation } from 'framer-motion'
import Panda from '../../svgs/Panda'
import Tomato from '../../svgs/Tomato'
import Todolist from '../../svgs/Todolist'
import TipCarousel from './TipCarousel'

interface Props {
  hide: () => void
}

const InfoCard: React.FC<Props> = () => {
  const location = useLocation()
  const animControls = useAnimation()

  useEffect(() => {
    animControls.start((i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2 },
    }))
  }, [animControls])

  let header = ''
  let desc = ''
  let usage = ''
  const loc = location.pathname.slice(1, location.pathname.length)
  let icon: null | ReactElement = null

  switch (location.pathname) {
    case '/pomodoro':
      header = 'Pomodoro'
      desc =
        'Pomodoro allows you to break down work into intervals, traditionally 25 minutes in length, separated by short breaks. Each interval is known as a pomodoro, from the Italian word for "tomato".'
      usage =
        'The technique is quite straigthforward - decide on the task to be done, start the timer and for the length of the session try to focus on the task. Beware distractions - they are the REAL enemy of good work.'
      icon = <Tomato />

      break
    case '/todo':
      header = 'Todo List'
      icon = <Todolist />
      desc =
        'Todo lists are everywhere and everybody tried one at least once in their lifetime. A lot of them are very complicated. This one is not and it comes with a twist.'
      usage =
        'Write down your tasks and check them after their completion. All tasks that are left unchecked are moved to the stash every midnight. The next day you can move them back and assign them to today.'

      break
    case '/habits':
      header = 'Habits'
      desc =
        'This one is big for me. Through altering your routine behaviors you can pretty much change every part of your life and with time achieve big things.'
      usage =
        'After adding a new habit, check it every day after its completion. The app will calculate your current and best streaks and display your check-ins in a calendar view.'
      icon = <Panda />
      break
    default:
      header = ''
      break
  }

  return (
    <Wrapper>
      <CardHeader>
        {icon}
        <h2>{header}</h2>
      </CardHeader>
      <Rows>
        <Row custom={0} animate={animControls} initial={{ opacity: 0, y: -70 }}>
          <BsCardText />
          <p>{desc}</p>
        </Row>
        <Row custom={1} animate={animControls} initial={{ opacity: 0, y: -70 }}>
          <GiLighthouse />
          <p>{usage}</p>
        </Row>
        <Row custom={2} animate={animControls} initial={{ opacity: 0, y: -70 }}>
          <GoLightBulb />
          <TipCarousel loc={loc} />
        </Row>
      </Rows>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  color: #eff6ee;
  height: 100%;
  padding: 1.5rem;
`
const CardHeader = styled.div`
  font-size: 2rem;
  min-width: 30%;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  & svg {
    height: 2.5rem;
    width: 2.5rem;
  }
`

const Rows = styled.div`
  height: calc(100% - 3rem);
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, minmax(1.5rem, 1fr)) 0.8fr;
  grid-row-gap: 1rem;
`

const Row = styled(motion.div)`
  background-color: #f23d4c;
  border-radius: 7px;
  display: grid;
  grid-template-columns: 1.2rem 1fr;
  grid-auto-rows: 1fr;
  grid-column-gap: 0.8em;
  padding: 0.3rem 1rem;
  align-items: center;
  line-height: 1.3;
  text-align: left;
  place-items: center;
  position: relative;

  & span {
    grid-column: 2 / -1;
  }

  & svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`

export default InfoCard
