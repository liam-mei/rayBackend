const childRouter = require('express').Router()
const db = require('../../models/Child-models')
// get -- this will get all of the parents children

childRouter
  .get('/', async (req, res, next) => {
    try {
      // TODO: Fix to return only the parents kids
      const children = await db.find()
      return res.status(200).json(children)
    } catch (error) {
      next(error)
    }
  })

  // getById
  .get('/:id', async (req, res, next) => {
    try {
      const [child] = await db.findBy({ id: req.params.id })
      return res.status(200).json(child)
    } catch (error) {
      next(error)
    }
  })

  // addChild
  .post('/', async (req, res, next) => {
    try {
      const newChild = await db.addChild(req.body)
      return res.status(201).json(newChild)
    } catch (error) {
      next(error)
    }
  })

  // update
  .put('/:id', async (req, res, next) => {
    try {
      // TODO:
      const child = await db.findBy({ id: req.params.id })

      if (child.length === 0) {
        return res.status(404).json({ message: 'That child was not found' })
      }

      await db.update(req.params.id, req.body)
      return res.status(200).json({ message: 'Child Updated' })
    } catch (error) {
      next(error)
    }
  })

  // delete
  .delete('/:id', async (req, res, next) => {
    try {
      const child = await db.findBy({ id: req.params.id })

      if (child.length === 0) {
        return res.status(404).json({ message: 'That child was not found' })
      }

      const response = await db.remove(req.params.id)
      res.json(response)
    } catch (error) {
      next(error)
    }
  })

module.exports = childRouter
