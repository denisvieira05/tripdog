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
      user,
      base64_image,
      name,
      genre,
      liked_by_users,
      dog_key
    } = response

    const entity = {
      user,
      base64Image: base64_image,
      dogKey: dog_key,
      name,
      genre,
      likedByUsers: liked_by_users
    }

    return entity
  }

  mapperEntityToRequest(entity, user, userId, newPostKey) {
    const {
      base64Image,
      genre,
      name  
    } = entity

    const {
      email,
      profile_picture,
      username
    } = user

    const request = {
      user: {
        email,
        profile_picture,
        username
      },
      base64_image: base64Image,
      name,
      dog_key: newPostKey,
      genre,
      liked_by_users: [
        userId
      ]
    }

    return request
  }

}

export default DogsConverter
