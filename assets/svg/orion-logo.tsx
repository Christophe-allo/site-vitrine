import type { SVGAttributes } from 'react'

const OrionLogo = (props: SVGAttributes<SVGElement>) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 32 32' fill='none' {...props}>
      <circle cx='16' cy='16' r='14.25' stroke='#2563EB' strokeWidth='2.5' />
      <text
        x='16'
        y='16'
        fill='#2563EB'
        dominantBaseline='central'
        fontFamily='var(--font-montserrat), Montserrat, sans-serif'
        fontSize='17'
        fontWeight='700'
        textAnchor='middle'
      >
        A
      </text>
    </svg>
  )
}

export default OrionLogo
