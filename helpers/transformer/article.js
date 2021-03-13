const timeUtils = require('../../utils/time');

function list(payload) {
    return payload.map(articleEntity => {
        article = articleEntity.toJSON();

        return {
            id: article.id,
            slug: article.slug,
            title: article.title,
            category_name: article.category?.name,
            category_button_color_code: article.category?.button_color_code,
            image_url: article.image_url,
            truncated_content: article.content.substring(0,130) + '...',
        }
    });
}

function detail(payload) {
    return {
        id: payload.id,
        slug: payload.slug,
        title: payload.title,
        category_name: payload.category?.name,
        category_button_color_code: article.category?.button_color_code,
        publisher_name: payload.publisher.name,
        image_url: payload.image_url,
        content: payload.content,
        published_at: timeUtils.indonesianDateFormat(new Date(payload.createdAt))
    }
}

module.exports = {
    list,
    detail
}