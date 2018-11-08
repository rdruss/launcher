#### NextStepsOpenShift

```jsx
initialState = { isOpen: false };
<div>
    <NextStepsOpenShift isOpen={state.isOpen} onClose={() => setState({ isOpen: false })} />
    <button onClick={() => setState({ isOpen: true })}>Open</button>
</div>
```