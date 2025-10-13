// sanity.config.ts
"use client"
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemaTypes'
import { projectId, dataset } from './src/sanity/env'
import { structure } from './src/sanity/structure'
import { markdownSchema } from 'sanity-plugin-markdown' // Import the plugin

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure,
    }),
    visionTool(),
    markdownSchema(), // Add the plugin here
  ],
  schema: {
    types: schemaTypes,
  },
})