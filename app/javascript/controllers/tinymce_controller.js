import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
    static targets = ['input']

    connect() {
        let config = Object.assign({ target: this.inputTarget }, TinyMCERails.configuration.default )
        tinymce.init(config)
    }

    disconnect () {
        if (!this.preview) tinymce.remove()
    }

    get preview () {
        return (
            document.documentElement.hasAttribute('data-turbolinks-preview') ||
            document.documentElement.hasAttribute('data-turbo-preview')
        )
    }
}
