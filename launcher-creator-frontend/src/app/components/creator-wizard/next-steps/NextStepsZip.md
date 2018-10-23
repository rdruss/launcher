#### NextStepsZip
```jsx
initialState = { isOpen: false };
<div>
    <NextStepsZip isOpen={state.isOpen} onClose={() => setState({ isOpen: false })} />
    <button onClick={() => setState({ isOpen: true })}>Open</button>
</div>
```