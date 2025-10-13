// src/sanity/schemaTypes/index.ts
import { blockContentType } from './blockContentType'
import { categoryType } from './categoryType' // Import categoryType
import { postType } from './postType'
import { authorType } from './authorType'

export const schemaTypes = [postType, authorType, categoryType, blockContentType] // Add categoryType here