import React from 'react'
import ChangeIcon from './components/ChangeIcon'
import LoadingIcon from './components/LoadingIcon'

const App = () => {
  const [loading, setLoading] = React.useState(false)
  const [text, setText] = React.useState('')
  const [translation, setTranslation] = React.useState('Aquí aparecerá la traducción')
  const { VITE_GEMINI_API_KEY } = import.meta.env

  const getTranslation = async event => {
    event.preventDefault()

    setLoading(true)

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${VITE_GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Translate this text to spanish: ${text}`
          }]
        }]
      })
    })

    const data = await response.json()

    if (text) {
      setTranslation(data.candidates[0].content.parts[0].text)
    }

    setLoading(false)
  }

  return (
    <main className='container flex gap-8 items-center w-full flex-col text-cyan-100 p-8 m-auto'>
      <h1 className='text-3xl text-center'>Traductor con inteligencia artificial</h1>
      <form
        onSubmit={getTranslation}
        className='flex gap-16 flex-col flex-wrap justify-center items-center xl:flex-row'
      >
        <textarea
          className='w-96 h-96 bg-slate-800 resize-none outline-none p-4 rounded-xl'
          placeholder='Ingrese el texto en inglés'
          name="text"
          onChange={event => setText(event.target.value)}
          value={text}
        ></textarea>
        <button
          className='bg-lime-500 text-slate-800 px-4 py-2 flex flex-col justify-center items-center gap-1 rounded-md hover:border-cyan-400 border-transparent border'
        >
          Traducir
          <ChangeIcon />
        </button>

        {loading
          ? <p className='w-96 h-96 flex justify-center items-center'><LoadingIcon /></p>
          : <p className='w-96 h-96 flex justify-center overflow-y-scroll p-4'>{translation}</p>
        }
      </form>
    </main>
  )
}

export default App
