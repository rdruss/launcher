#### NextStepsZip
```jsx
initialState = { isOpen: false };
<div>
    <ProcessingApp isOpen={state.isOpen} onClose={() => setState({ isOpen: false })} />
    <button onClick={() => setState({ isOpen: true })}>Open</button>
</div>
```