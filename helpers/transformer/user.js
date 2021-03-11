function detail(payload) {
    return {
        id: payload.id,
        name: payload.name,
        email: payload.email,
        role: payload.role,
        is_verified: payload.is_verified,
        is_subscribe_newsletter: payload.is_subscribe_newsletter
    }
}

module.exports = {
    detail
}