// src/lib/sanity.ts
import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = '2025-10-05' // Use the current date

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to `false` for drafts and live previews
})