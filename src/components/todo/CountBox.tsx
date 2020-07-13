import React from 'react'
import styled from 'styled-components/macro'
import { TaskInt } from '../../pages/Todo'
import { BeatLoader } from 'react-spinners'

interface Props {
  tasks: TaskInt[]
  type: 'scheduled' | 'stashed'
}

const CountBox: React.FC<Props> = ({ tasks, type }) => {
  const filterDone = (tasks: TaskInt[]) =>
    tasks?.filter((task) => task.done).length

  return (
    <>
      {tasks && (
        <Wrapper type={type}>
          {type === 'scheduled' ? (
            <>
              <Count>
                {filterDone(tasks)}/{tasks.length}
              </Count>
              <Desc>Completed</Desc>
            </>
          ) : (
            <>
              <Count>{tasks.length}</Count>
              <Desc>{type}</Desc>
            </>
          )}
        </Wrapper>
      )}
    </>
  )
}

const Wrapper = styled.div<{ type: string }>`
  grid-area: sCount;
  background-color: ${(props) => props.theme.colors.secondary};
  grid-area: ${(props) => (props.type === 'scheduled' ? 'tCount' : 'sCount')};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
`

const Count = styled.span`
  font-size: 1.4rem;
`

const Desc = styled.span``

export default CountBox
