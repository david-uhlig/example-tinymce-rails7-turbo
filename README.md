# Example Integration of TinyMCE in Rails 7 with Turbo Drive Support

This example project demonstrates the integration of the [TinyMCE](https://www.tiny.cloud/) editor in Rails 7. It utilizes the well known [tinymce-rails](https://github.com/spohlenz/tinymce-rails) gem and offers full Turbo Drive support through an additional Stimulus controller.

Since Rails 7 the [turbo-rails](https://github.com/hotwired/turbo-rails) library is included by default. Turbo Drive intercepts link clicks and form submits. It makes sure that only the `<body>` part of the page is rerendered instead of the whole page. 

This leads to TinyMCE not being properly detached and reattached when a Turbo Drive response is rendered. The textarea will appear without the TinyMCE editor. The Stimulus controller helps to reattach TinyMCE and respects the settings in `config/tinymce.yml`.

## Instructions

Details about the integration can be found in this [Gist](https://gist.github.com/david-uhlig/ccdda4800156e1dadeedfc0411736267).

## Try out the example integration

**1. Clone the repository**

```
git clone https://github.com/david-uhlig/example-tinymce-rails7-turbo
cd example-tinymce-rails7-turbo/
```
Then run `bundle install`

**2. Start the server**

```
rails s --port 3000
```
Open http://localhost:3000 in your browser.

## Sources

* `tinymce-rails` [README](https://github.com/spohlenz/tinymce-rails/blob/main/README.md) for the general setup.
* Blog post "[Making TinyMCE work with Rails, Turbolinks and Stimulus](https://dev.to/djchadderton/making-tinymce-work-with-rails-turbolinks-and-stimulus-2ooa)" from djchadderton with the main idea for the Stimulus controller included in this demo.

## Notes

### Without the `tinymce-rails` gem

The `tinymce-rails` gem is not strictly necessary. You may also use the Tiny Cloud CDN similarly as described [here](https://www.tiny.cloud/docs/tinymce/6/rails-cloud/).

**1. Add the following line to the `<head>` section of `app/views/layouts/application.html.erb`**

```html
<script src="https://cdn.tiny.cloud/1/no-api-key/tinymce/6/tinymce.min.js" referrerpolicy="origin"></script>
```

**2. Add the initialization to your Stimulus controller**

```js
    initialize() {
        this.defaults = {
            selector: '.tinymce',
            toolbar: [
                'styleselect | bold italic | undo redo',
                'image | link'
            ],
            plugins: 'lists link image table code help wordcount'
        }
    }
```

**3. Replace the connect function in the Stimulus controller**

```js
    connect() {
        let config = Object.assign({ target: this.inputTarget }, this.defaults)
        tinymce.init(config)
    }
```

The settings will no longer be read from `config/tinymce.yml` but from the Stimulus controller instead.

## Using `importmap`

I would be very interested in a solution utilizing `bin/importmap pin tinymce`. This seems to be the favorable way going forward in Rails 7. I had no luck making it work, though.
