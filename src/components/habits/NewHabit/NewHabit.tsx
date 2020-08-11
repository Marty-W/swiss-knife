import React, { useState } from 'react'

import { TextField } from '@material-ui/core'
import styled from 'styled-components'
import { FirebaseError } from 'firebase'
import Button from '../../UI/Button'
import ColorPicker from './ColorPicker'
import ErrorMsg from '../../UI/ErrorMsg.styles'
import { db } from '../../../firebase/firebase'
import useCurrentUser from '../../../hooks/useCurrentUser'

interface Props {
  hide: () => void
}

const NewHabit: React.FC<Props> = ({ hide }) => {
  const [color, setColor] = useState<string>('#f44336')
  const [description, setDescription] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState<FirebaseError>()
  const user = useCurrentUser()

  const submitNewHabit = async () => {
    if (user) {
      const habitRef = db.collection(`users/${user?.uid}/habitList`).doc()
      try {
        await habitRef.set({
          name,
          description,
          color,
          id: habitRef.id,
          timePoints: [],
        })
        hide()
      } catch (err) {
        setError(err)
      }
    }
  }

  return (
    <Wrapper>
      {error ? (
        <ErrorMsg>{error.message}</ErrorMsg>
      ) : (
        <>
          <MaterialInputName
            id="habit-name"
            label="Name"
            name="habit-name"
            onChange={(e) => setName(e.target.value)}
            placeholder="TV 2hrs"
            required
            size="small"
            value={name}
          />
          <ColorPicker color={color} onColorChange={setColor} />
          <MaterialInputDesc
            id="habit-desc"
            label="Description"
            name="habit-description"
            onChange={(e) => setDescription(e.target.value)}
            placeholder=""
            multiline
            size="small"
            value={description}
          />
          <HabitBtn onClick={submitNewHabit} variant="primary" color={color}>
            Add new habit
          </HabitBtn>
        </>
      )}
    </Wrapper>
  )
}

export default NewHabit

const Wrapper = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 0.4fr 0.4fr 0.3fr;
  grid-template-areas:
    'name name'
    'desc desc'
    'color btn';
  align-items: center;
  grid-row-gap: 1em;
  & label {
    font-size: 0.85rem;
  }

  & button {
    justify-self: center;
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
  align-self: end;
`

const HabitBtn = styled(Button)<{ color: string }>`
  background-color: ${(props) => props.color};
`
