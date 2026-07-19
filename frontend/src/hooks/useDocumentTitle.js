import { useEffect } from 'react'

export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — bloggy` : 'bloggy'
    return () => {
      document.title = 'bloggy'
    }
  }, [title])
}
