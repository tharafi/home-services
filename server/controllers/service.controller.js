import Service from "../models/service.model.js"
import createError from "../utils/createError.js"


export const createService = async (req, res, next) => {
  if(!req.isSeller) {
    return next(createError(403, "Only sellers can create a service!"))
  }
  const newService = new Service({
    userId: req.userId,
    ...req.body,
  })

  try{
    const saveService = await newService.save()
    res.status(201).json(saveService)
  }catch(err) {
    next(err)
  }
}
export const deleteService = async (req, res, next) => {
  try{
    const service = await Service.findById(req.params.id);
    if(service.userId !== req.userId) 
    return next(createError(403, "You can delete only your service!"))

    await Service.findByIdAndDelete(req.params.id);
    res.status(200).send("service has been deleted!")
  }catch(err) {
    next(err)
  }
}
export const getService = async (req, res, next) => {
  try{
    const service = await Service.findById(req.params.id);
    if(!service) next(createError(404, "service not found!"))

    res.status(200).send(service)
  }catch(err) {
    next(err)
  }
}
export const getServices = async (req, res, next) => {
  try{
    const q = req.query;
    const filters = {
      ...(q.userId &&{userId: q.userId}),
      ...(q.category &&{category: q.category }),
      ...(q.search && {title: {$regex: q.search, $options: "i"}})  
    }
    const services = await Service.find(filters);

    res.status(200).send(services)
  }catch(err) {
    next(err)
  }
}