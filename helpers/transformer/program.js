function list(payload) {
    return payload.map(programEntitiy => {
        program = programEntitiy.toJSON();

        return {
            id: program.id,
            slug: program.slug,
            program_type_name: program.type?.name,
            program_type_button_color_code: program.type?.button_color_code,
            title: program.title,
            description: program.description,
            image_url: program.image_url,
            duration: program.duration
        }
    });
}

function detail(payload) {
    return {
        id: payload.id,
        slug: payload.slug,
        program_type_name: payload.type?.name,
        program_type_button_color_code: program.type?.button_color_code,
        tools: payload.tools?.map(tool => tool.name) || [],
        title: payload.title,
        description: payload.description,
        image_url: payload.image_url,
        video_url: payload.video_url,
        duration: payload.duration,
        is_favorited: payload.is_favorited
    }
}

module.exports = {
    list,
    detail
}