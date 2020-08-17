import React from 'react'
import styled from 'styled-components/macro'
import { motion } from 'framer-motion'
import useTheme from '../../hooks/useTheme'

interface Props {
  onClick?:
    | ((
        event: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
      ) => void)
    | undefined
  variant: 'primary' | 'secondary'
  className?: string
  disabled?: boolean
}

const Button: React.FC<Props> = ({
  children,
  onClick,
  variant,
  className,
  disabled,
}) => {
  const [theme] = useTheme()
  return (
    <StyledButton
      className={className}
      initial={{ opacity: 0, borderRadius: '0.4rem' }}
      animate={{ opacity: 1 }}
      variant={variant}
      whileHover={{
        scale: 1.01,
        x: -2,
        borderRadius: '0rem',
      }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      disabled={disabled}
      themeVariant={theme}
    >
      {children}
    </StyledButton>
  )
}

const StyledButton = styled(motion.button)<{
  variant: string
  themeVariant: string
}>`
  display: inline-block;
  padding: 0.46rem 1.6rem;
  border-radius: 0.4rem;
  color: ${(props) =>
    props.themeVariant === 'dark'
      ? props.theme.colors.tertiary
      : props.theme.colors.primary};
  background-color: ${(props) =>
    props.variant === 'primary'
      ? props.theme.colors.accent
      : props.theme.colors.primary};
  text-align: center;
  cursor: pointer;
  border: none;
  font-size: 1rem;

  &:hover {
    background-color: ${(props) =>
      props.variant === 'primary'
        ? props.theme.colors.accent
        : props.theme.colors.secondaryAccent};
  }
`

export default Button
