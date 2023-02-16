import * as React from "react"

const LoadingIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-chart-arcs-3 animate-spin"
    width={40}
    height={40}
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M0 0h24v24H0z" stroke="none" />
    <path d="M11 12a1 1 0 1 0 2 0 1 1 0 1 0-2 0" />
    <path d="M7 12a5 5 0 1 0 5-5" />
    <path d="M6.29 18.957A9 9 0 1 0 12 3" />
  </svg>
)

export default LoadingIcon
