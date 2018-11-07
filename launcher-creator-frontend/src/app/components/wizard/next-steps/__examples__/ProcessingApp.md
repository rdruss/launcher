#### ProcessingApp
```jsx
initialState = { isOpen: false };
<div>
    <ProcessingApp isOpen={state.isOpen} onClose={() => setState({ isOpen: false })} />
    <button onClick={() => setState({ isOpen: true })}>Open simple</button>
</div>
```


```jsx
initialState = { isOpen: false };
const events = [
    { name: 'PHASE_1', message: 'Processing phase 1' },
    { name: 'PHASE_2', message: 'Processing phase 2' },
    { name: 'PHASE_3', message: 'Processing phase 3' },
];
const progressEventsResults = [
    { statusMessage: 'PHASE_1' },
    { statusMessage: 'PHASE_2' },
];
<div>
    <ProcessingApp 
        isOpen={state.isOpen} 
        progressEvents={events}
        progressEventsResults={progressEventsResults}
        onClose={() => setState({ isOpen: false })} 
        />
    <button onClick={() => setState({ isOpen: true })}>Open with progress</button>
</div>
```