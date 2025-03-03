import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs/promises'
import path from 'path'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { moduleId, lessonId } = req.query

    if (typeof moduleId !== 'string' || typeof lessonId !== 'string') {
        return res.status(400).json({ error: 'Invalid moduleId or lessonId' })
    }

    try {
        const filePath = path.join(process.cwd(), 'src', 'app', 'lessons', moduleId, `${lessonId}.md`)
        const content = await fs.readFile(filePath, 'utf8')
        res.status(200).json({ content })
    } catch (error) {
        console.error('Failed to read lesson content:', error)
        res.status(500).json({ error: 'Failed to load lesson content' })
    }
}
