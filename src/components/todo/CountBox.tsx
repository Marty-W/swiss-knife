import React from 'react'
import styled from 'styled-components/macro'
import { ITask } from '../../utils/interfaces'

interface Props {
  tasks: ITask[]
  type: 'scheduled' | 'stashed'
}

const CountBox: React.FC<Props> = ({ tasks, type }) => {
  const filterDone = (tasksArr: ITask[]) =>
    tasksArr.filter((task) => task.done).length

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
  background-color: ${(props) =>
    props.type === 'scheduled'
      ? props.theme.colors.accent
      : props.theme.colors.secondaryAccent};
  grid-area: ${(props) => (props.type === 'scheduled' ? 'tCount' : 'sCount')};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  color: #eff6ee;

  @media (min-width: 750px) {
    height: 60%;
    align-self: center;
  }
`

const Count = styled.span`
  font-size: 1.4rem;
`

const Desc = styled.span``

export default CountBox
