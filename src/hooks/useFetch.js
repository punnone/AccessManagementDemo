import { useState, useEffect, useRef } from "react"
import axios from "axios"

// Title: Memoizing Fetched Data | Ref: https://en.wikipedia.org/wiki/Memoization
const useFetch = (url, option) => {
  const cache = useRef({})
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!url) return

    const fetchData = async () => {
      setIsLoading(true)

      if (cache.current[url]) {
        const isDataFromCache = cache.current[url]

        setResponse(isDataFromCache)
        setIsLoading(false)
        setError(null)
      } else {
        try {
          const res = await fetch(url, option)
          const json = res.json()

          setResponse(json)
          setIsLoading(false)
        } catch (error) {
          setError(error)
        }
      }
    }

    fetchData()
  }, [url])

  return { response, error, isLoading }
}

export default useFetch
