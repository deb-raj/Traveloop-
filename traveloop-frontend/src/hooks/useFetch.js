import { useState, useEffect } from 'react'

/**
 * Generic data fetching hook
 * @param {Function} fetcher - async function that returns data
 * @param {Array} deps - dependency array (refetch when changed)
 */
const useFetch = (fetcher, deps = []) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refetch = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await fetcher()
      setData(result)
    } catch (err) {
      setError(err.message || 'Failed to fetch')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return { data, loading, error, refetch }
}

export default useFetch