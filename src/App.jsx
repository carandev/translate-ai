import React from 'react'
import ChangeIcon from './components/ChangeIcon'
import LoadingIcon from './components/LoadingIcon'

const App = () => {
  const [loading, setLoading] = React.useState(false)
  const [text, setText] = React.useState('')
  const [translation, setTranslation] = React.useState('Aquí aparecerá la traducción')
  const {VITE_OPENAI_API_KEY} = import.meta.env

  const getTranslation = async event => {
    event.preventDefault()

    setLoading(true)

    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${VITE_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: `Translate this into Spanish: ${text}`,
        temperature: 0.3,
        max_tokens: 600,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      })
    })

    const data = await response.json()

    if (text) {
      setTranslation(data.choices[0].text)
    } else {
      setTranslation(data.choices[0].text.split("\n")[4])
      setText(data.choices[0].text.split("\n")[2])
    }

    setLoading(false)
  }

  return (
    <main className='flex gap-8 items-center w-full flex-col text-cyan-100 p-8'>
      <h1 className='text-3xl text-center'>Traductor con inteligencia artificial</h1>
      <p>Traduce cualquier texto en inglés a español</p>
      <form 
        onSubmit={getTranslation}
        className='flex gap-16 flex-wrap justify-center items-center'
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
            ? <p className='w-96 h-96 flex justify-center items-center'><LoadingIcon/></p> 
            : <p className='w-96 h-96 flex justify-center overflow-scroll p-4'>{translation}</p>
          }
      </form>
    </main>
  )
}

export default App
