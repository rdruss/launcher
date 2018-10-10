#### NextStepsOpenShift
```jsx
initialState = { isOpen: false };
<div>
    <NextStepsOpenShift show={state.isOpen} >
        <button onClick={() => setState({ isOpen: false })}>Close</button>
    </NextStepsOpenShift>
    <button onClick={() => setState({ isOpen: true })}>Open</button>
</div>
```