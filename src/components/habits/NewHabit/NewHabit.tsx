import React, { useState, FormEvent } from 'react'

import { TextField } from '@material-ui/core'
import styled from 'styled-components/macro'
import { useErrorHandler } from 'react-error-boundary'
import Button from '../../UI/Button'
import ColorPicker from './ColorPicker'
import useUserDocumentRef from '../../../hooks/useUserDocumentRef'

interface Props {
  hide: () => void
}

const NewHabit: React.FC<Props> = ({ hide }) => {
  const [color, setColor] = useState<string>('#f44336')
  const [description, setDescription] = useState('')
  const [name, setName] = useState('')
  const habitListRef = useUserDocumentRef(
    'habitList',
  ) as firebase.firestore.CollectionReference
  const errorHandler = useErrorHandler()

  const submitNewHabit = async (e: FormEvent) => {
    e.preventDefault()
    const habitRef = habitListRef.doc()
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
      errorHandler(err)
    }
  }

  return (
    <Wrapper>
      <form onSubmit={submitNewHabit}>
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
        <HabitBtn variant="primary" color={color}>
          Add new habit
        </HabitBtn>
      </form>
    </Wrapper>
  )
}

export default NewHabit

const Wrapper = styled.div`
  height: 100%;
  & form {
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
      grid-area: btn;
    }
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
