import { motion } from 'framer-motion'
import { Edit, Trash2 } from 'lucide-react'
import type React from 'react'
import { Button } from '~/components/ui/button'
import { Card, CardContent } from '~/components/ui/card'
import { LinkPreview } from '~/components/ui/link-preview'
import type { Subscription } from '~/store/subscriptionStore'

interface SubscriptionCardProps {
  subscription: Subscription
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  className?: string
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ subscription, onEdit, onDelete, className }) => {
  const { id, name, price, currency, domain, icon } = subscription

  // Sanitize the domain URL
  const sanitizeDomain = (domain: string) => {
    try {
      return new URL(domain).href
    } catch {
      return new URL(`https://${domain}`).href
    }
  }

  const sanitizedDomain = sanitizeDomain(domain)
  const defaultLogoUrl = `https://www.google.com/s2/favicons?domain=${sanitizedDomain}&sz=64`

  // Use custom icon if available, otherwise fall back to domain favicon
  const logoUrl = icon || defaultLogoUrl

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`group ${className}`}
    >
      <Card className="bg-card hover:bg-card/80 transition-all duration-200 shadow-md hover:shadow-lg relative h-full">
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
          <Button variant="outline" size="icon" onClick={() => onEdit(id)} className="bg-background hover:bg-muted">
            <Edit className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onDelete(id)}
            className="bg-background hover:bg-muted text-destructive hover:text-destructive/80"
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
        <LinkPreview url={sanitizedDomain}>
          <CardContent className="flex flex-col items-center justify-center p-4 sm:p-6 h-full">
            <img src={logoUrl} alt={`${name} logo`} className="w-16 h-16 mb-3 rounded-full shadow-md" />
            <h3 className="text-xl sm:text-1xl font-bold mb-2 text-card-foreground max-w-full text-wrap-balance overflow-wrap-break-word line-clamp-1 text-center">
              {name}
            </h3>
            <p className="text-md sm:text-sm font-semibold text-card-foreground text-center">{`${currency} ${price}`}</p>
          </CardContent>
        </LinkPreview>
      </Card>
    </motion.div>
  )
}

export default SubscriptionCard
