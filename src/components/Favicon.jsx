import { useEffect } from 'react'
import { useSiteInfo } from '../hooks/useSiteInfo'

const Favicon = () => {
  const siteInfo = useSiteInfo()

  useEffect(() => {
    // Récupérer le favicon (peut être string ou objet)
    const faviconUrl = typeof siteInfo?.favicon === 'string' 
      ? siteInfo.favicon 
      : siteInfo?.favicon?.url

    if (faviconUrl) {
      // Supprimer les anciens favicons
      const existingFavicons = document.querySelectorAll("link[rel='icon'], link[rel='shortcut icon']")
      existingFavicons.forEach(el => el.remove())

      // Créer le nouveau favicon
      const link = document.createElement('link')
      link.rel = 'icon'
      link.href = faviconUrl
      document.head.appendChild(link)
    }
  }, [siteInfo?.favicon])

  return null // Ce composant ne rend rien visuellement
}

export default Favicon
