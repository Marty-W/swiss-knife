import React, { useState } from 'react'
import styled from 'styled-components'
import Modal from '../../UI/Modal'
import DayPicker from './DayPicker'
import ColorPicker from './ColorPicker'
import { TextField } from '@material-ui/core'
import Button from '../../UI/Button.styles'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { useHistory } from 'react-router-dom'
import { db } from '../../../firebase/firebase'
import useCurrentUser from '~/hooks/useCurrentUser'

//TODO refactor to reducer
const initialDays = [
  { key: 'MO', clicked: false },
  { key: 'TU', clicked: false },
  { key: 'WE', clicked: false },
  { key: 'TH', clicked: false },
  { key: 'FR', clicked: false },
  { key: 'SA', clicked: false },
  { key: 'SU', clicked: false },
]

const NewHabit: React.FC = () => {
  const [days, setDays] = useState(initialDays)
  const [color, setColor] = useState<string>('#fff')
  const [description, setDescription] = useState('')
  const [name, setName] = useState('')
  const user = useCurrentUser()
  const history = useHistory()

  const handleDayPick = (dayQuery: string) => {
    const daysCopy = [...days]
    const clickedDay = daysCopy.find((day) => day.key === dayQuery)
    if (clickedDay) {
      clickedDay.clicked = !clickedDay.clicked
    }
    setDays(daysCopy)
  }

  const submitNewHabit = async () => {
    if (user) {
      const habitRef = db.collection(`users/${user?.uid}/habitList`).doc()
      const dayStr = days
        .filter((entry) => entry.clicked)
        .map((entry) => entry.key)
        .join(',')
      try {
        await habitRef.set({
          name,
          days: dayStr,
          description,
          color,
          id: habitRef.id,
          timePoints: [
            {
              date: new Date(),
              done: false,
            },
          ],
        })
      } catch (err) {
        console.log(err)
      } finally {
        history.push('/habits')
      }
    }
  }

  return (
    <Modal>
      <Wrapper>
        <MaterialInputName
          id="habit-name"
          label="Name"
          name="habit-name"
          onChange={(e) => setName(e.target.value)}
          placeholder="Meditation"
          required
          size="small"
          value={name}
        />
        <DayPicker onPick={handleDayPick} days={days} />
        <ColorPicker color={color} onColorChange={setColor} />
        <MaterialInputDesc
          id="habit-desc"
          label="Description"
          name="habit-description"
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Easing of mind"
          multiline
          size="small"
          value={description}
        />
        <Button onClick={submitNewHabit}>Add new habit</Button>
        <CloseBtn onClick={history.goBack} />
      </Wrapper>
    </Modal>
  )
}

export default NewHabit

const Wrapper = styled.div`
  position: relative;
  width: 80%;
  height: 40%;
  padding: 1em;
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: 10px;
  display: grid;
  grid-template-rows: 1fr 0.5fr 0.3fr 0.7fr 0.3fr;
  grid-template-areas:
    'name'
    'day'
    'color'
    'desc'
    'btn';
  align-items: center;
  grid-row-gap: 1em;
  & label {
    font-size: 0.85rem;
  }
`

const MaterialInputName = styled(TextField)`
  && input {
    color: ${(props) => props.theme.colors.tertiary};
  }

  && label {
    color: ${(props) => props.theme.colors.tertiary};
    font-size: 0.85rem;
  }

  .MuiInput-underline::after {
    border-bottom: 2px solid ${(props) => props.theme.colors.accent};
  }

  && textarea {
    color: ${(props) => props.theme.colors.tertiary};
  }

  grid-area: name;
`

const MaterialInputDesc = styled(MaterialInputName)`
  grid-area: desc;
  align-self: start;
`

const CloseBtn = styled(AiOutlineCloseCircle)`
  position: absolute;
  top: 0.5em;
  right: 0.5em;
  font-size: 1.4rem;
  cursor: pointer;
`
