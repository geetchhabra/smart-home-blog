import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    // ADD THIS NEW EXCERPT FIELD
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      validation: (Rule) =>
        Rule.max(200).error('Excerpt must be under 200 characters.'),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
        }),
      ],
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: {type: 'category'}})],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),

    // Existing Portable Text body (keep if still needed)
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      description:
        'Portable Text content. Use this if preferring Sanity block content.',
    }),

    // NEW: Markdown content field powered by sanity-plugin-markdown
    defineField({
      name: 'content',
      title: 'Content (Markdown)',
      type: 'markdown',
      options: {
        // Optional: customize behavior if supported by your plugin version
        // e.g., minHeight: 300
      },
      description:
        'Write in Markdown (## headings, * bullets, 1. lists). Render with react-markdown on the frontend.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
