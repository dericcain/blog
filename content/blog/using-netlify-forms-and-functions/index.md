---
path: "/using-netlify-forms-and-functions"
date: "2018-05-22"
title: "Using Netlify Forms and Functions"
description: "How to use Netlify Forms and Functions."
---
[Netlify](https://www.netlify.com/) is awesome! And, it is free. So, I decided to give them a shot a build a static site that uses their [Forms](https://www.netlify.com/docs/form-handling) and [Functions](https://www.netlify.com/docs/functions/) service. The objective was to create a form that would allow users to sign up for a newsletter. Here is the flow:

1. User enters email and submits form
2. The form data is sent to Netlify using their Forms feature
3. A Netlify Function is triggered based on the form submission event
4. The Function contains the logic to add a user to a subscribers list

I am going to walk through the steps of getting the Form to talk to the Functions because even though there is documentation on this process, I did not find it to be as straightforward as it should be. I am using Gatsby (React), but this process mostly deals with the Netlify services, so this should not really matter that much.

> I will assume that you already have a Netlify account and a site to work with.

## The Form

Here is the form that I have on my site:

```javascript
const encode = data =>
  Object.keys(data)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        .join('&');

class Subscribe extends Component {
  state = {
    email: '',
    'bot-field': '',
    isSuccess: false,
    buttonIsDisabled: false,
  };

  handleSubmit = e => {
    e.preventDefault();

    this.setState({
      isSuccess: false,
      buttonIsDisabled: true,
    });

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'subscribe', ...this.state }),
    })
      .then(() => {
        this.setState({
          isSuccess: true,
          email: '',
        });
      })
      .catch(error => {
        throw new Error(error);
      })
      .finally(() => {
        this.setState({ buttonIsDisabled: false });
      })
  };

  handleOnChange = ({ currentTarget }) => {
    this.setState({ [currentTarget.name]: currentTarget.value });
  };

  render() {
    return (
      <FormWrapper>
        <h1>Want to be notified?</h1>
        <p>I will gladly send you an email when I write new content. I also vow to protect your
          email address and will never share it with anyone.</p>
        <Form
          name="subscribe"
          data-netlify-honeypot="bot-field"
          method="POST"
          data-netlify="true"
          onSubmit={this.handleSubmit}
        >
          <HoneypotField>
            <label htmlFor="bot-field">
              <input type="text" id="bot-field" name="bot-field" onChange={this.handleOnChange}/>
            </label>
          </HoneypotField>
          <Label htmlFor="email">
            Email
            <Input type="email" id="email" name="email" onChange={this.handleOnChange}/>
          </Label>
          <Button type="submit" disabled={this.state.buttonIsDisabled}>Sign up!</Button>
          <SuccessMessage isActive={this.state.isSuccess}>
            You have been added to the list!
          </SuccessMessage>
        </Form>
      </FormWrapper>
    );
  }
}

export default Subscribe;

```
There are a few things going on here, so let's talk about them, with a focus on the form. In order for Netlify to recognize that you want to use their Form service, we must add a couple of attributes to the form element.

- `name` - This is the name of the form and how it will be displayed on your backend.
- `data-netlify-honeypot` - This keeps the spam bots at bay. Read more [here](https://www.netlify.com/docs/form-handling/#spam-filtering).
- `data-netlify` - This is the tag that tells Netlify that we want to use their service. Without this tag, Netlify will not collect our form results.

We also need to give our form fields the `name` attribute so that we can encode those values and submit them when the form submits. 

To handle the form submission, check out the `handleSubmit` method and how we encode the data before submitting it and, finally, how we submit the data.

> Be sure and submit the `honey-pot` field so that we can detect spam.

> In order for this to work, you must deploy your site. This way Netlify can read your form and setup the service for you.

After the site is deployed, you should be able to visit the preview deploy of the site and make a form submission. Once you submit the form, you can login to Netlify and see all of your form submissions. Once you have verified that the form submission is working properly, you can move on to the next section.

## The Function

We need to fire off a function with every form submission so that we can do something with the data that is submitted with the form. Luckily, Netlify has planned for this and their service allows us to [invoke functions based on different events](https://www.netlify.com/docs/functions/#event-triggered-functions). The event that we are concerned with here is the `submission-created` event. 

First thing we need to do is to create our function in our project. Now, the name of the function is important here. The name of the function needs to be the name of the event, so in our case, we create a function named `submission-created.js` in our functions folder (the location of your functions folder can be set in the Netlify backend or in the [netlify.toml](https://www.netlify.com/docs/netlify-toml-reference/) file) 

Here is what our function looks like:

```javascript
exports.handler = (event, context, callback) => {
  const { email } = JSON.parse(event.body).payload;

    // Do something with the email address and then 
    // invoke the callback.
     
  callback(null, {
    statusCode: 200,
    body: data,
  })

};
```

The part of the docs that is unclear, at least to me, is how you get the form data that was submitted. As you can see, you need to `JSON.parse(event.body)` and then grab the `payload` property off of the `body` object. Once you have that, all of you form fields will be properties of the `payload` object.

Now, you can do whatever you need to do with the form fields. In my case, I made an API call to add the email to a newsletter list.

## Conclusion

Netlify makes it really easy to get up and running with static sites and also offers some great functionality with their Forms and Functions services, as well as their other offerings. The best part about it is that they are free (in most cases). You should definitely check them out.
