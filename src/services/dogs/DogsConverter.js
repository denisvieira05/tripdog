class DogsConverter {
  mapperResponsesToEntities(responses) {
    const entities = []
    responses.map((response) => {
      entities.push(this.mapperResponseToEntity(response))
    })
    return entities
  }

  mapperResponseToEntity(response) {
    const {
      id,
      base64_image,
      name,
      user_id
    } = response

    const entity = {
      id,
      base64Image: base64_image,
      name,
      userId: user_id,
    }

    return entity
  }

}

export default DogsConverter
