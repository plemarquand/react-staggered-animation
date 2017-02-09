# React Staggered Animation

![Demo](demo.gif)

Animates items with a delay between them.

## Install
`npm install react-staggered-animation --save`

## Usage

First, define some CSS that describes your animation.

```css
.fade-enter {
  opacity: 0.01;
  transform: translateY(50px);
}

.fade-enter.fade-enter-active) {
  transition: opacity 250ms ease-in;
  opacity: 1;
}

.fade-appear { opacity: 0.01; }
.fade-appear.fade-appear-active { opacity: 1; transition: opacity 250ms ease-in; }

.fade-leave {
  opacity: 1;
}

.fade-leave.fade-leave-active {
  opacity: 0.01;
  transition: opacity 100ms ease-in;
}
```

Then just add children.

```jsx
<StaggeredAnimation delay={100} transitionName="fade">
  <h1>One</h1>
  <h1>Two</h1>
  <h1>Three</h1>
</StaggeredAnimation>
```

Under the hood StaggeredAnimation uses ReactCSSTransitionGroup. For more information on how to configure animations, see https://facebook.github.io/react/docs/animation.html.

Note: If you're using StaggeredAnimation with a custom component, that custom component should accept a `className` property and pass it on
to its top level renderable element (`div`, `span`, etc...).

### Premade Animations

It is possible to use premade animations such as [animate.css](https://daneden.github.io/animate.css/). For instance, the example below uses the `bounceInUp` transition in animate.css.

```js
const transition = {
  appear: 'animate_animated',
  appearActive: 'animate_bounceInUp',
};

<StaggeredAnimation delay={100} transitionName={transition}>
  <h1>One</h1>
  <h1>Two</h1>
  <h1>Three</h1>
</StaggeredAnimation>
```

## API
#### `children` - React.PropTypes.node | Array (Required)
One or more children to animate.

#### `delay` - Number
Amount of time in milliseconds the animation should be staggered. For instance if this were 100, every 100ms the next child would begin its animation until there are no children left to animate.

#### `duration` - Number (Optional)
The duration of a single animation. This is required for cleaning up classes on animated elements once their animation is completed. If not specified the classes are not removed, however if you are just animating elements in (and not removing them) you can omit this property.

#### `start` - Number (Optional)
Delay to apply to all items. For instance if you have a `delay` of 100ms, and a `start` of 500ms, the first item will begin to animate at 500ms, the second at 600ms, etc...

#### `className` - String (Optional)
Optional className to pass on to the internal `ReactCSSTransitionGroup` wrapper element.
