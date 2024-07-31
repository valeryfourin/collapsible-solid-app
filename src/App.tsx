import { createSignal } from 'solid-js';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './components';
import { CollapsibleApi } from './components/types';

function App() {
	// Controlled Collapsible
	const [isControlledOpened, setIsControlledOpened] = createSignal(true);
	const handleToggle = () => {
		setIsControlledOpened(!isControlledOpened())
	};

	// Uncontrolled Collapsible
	const [ref, setRef] = createSignal<CollapsibleApi>();
	const toggleUncontrolled = () => ref()?.toggle();

	return (
		<>
			<Collapsible isOpened={isControlledOpened()} onToggle={handleToggle}>
				<CollapsibleTrigger
					class="px-4 py-2 my-2 border border-indigo-500 bg-indigo-500 text-white rounded-md transition duration-300 ease select-none hover:bg-indigo-600"
				>
					Controlled Collapsible
					<span class={`ml-2 inline-block transform transition-transform duration-300 ${isControlledOpened() ? "rotate-180" : "rotate-0"}`}>˅</span>
				</CollapsibleTrigger>
				<CollapsibleContent>
					<b>Usage example:</b><br/>
					<code>
						&lt;Collapsible isOpened=&#123;isControlledOpened()&#125; onToggle=&#123;handleToggle&#125;&gt; <br/>
						&nbsp;&nbsp; &lt;CollapsibleTrigger&gt;Controlled Collapsible&lt;/CollapsibleTrigger&gt;<br/>
						&nbsp;&nbsp; &lt;CollapsibleContent&gt;Lorem ipsum, dolor sit amet consectetur adipisicing elit.&lt;/CollapsibleContent&gt;<br/>
						&lt;/Collapsible&gt;
					</code>
				</CollapsibleContent>
			</Collapsible>
				
			<Collapsible as="section" ref={setRef}>
				<CollapsibleTrigger
					as="button"
					class="px-4 py-2 my-2 data-[state=open]:animate-wiggle border border-teal-500 bg-teal-500 text-white rounded-md transition duration-300 ease select-none hover:bg-teal-600"
				>
					Uncontrolled Collapsible
				</CollapsibleTrigger>
				<CollapsibleContent as="p">
					<b>Usage example:</b><br/>
					<code>
						&lt;Collapsible as="section" ref=&#123;setRef&#125;&gt; <br/>
						&nbsp;&nbsp; &lt;CollapsibleTrigger&gt;Uncontrolled Collapsible&lt;/CollapsibleTrigger&gt;<br/>
						&nbsp;&nbsp; &lt;CollapsibleContent&gt;Lorem ipsum, dolor sit amet consectetur adipisicing elit.&lt;/CollapsibleContent&gt;<br/>
						&lt;/Collapsible&gt;
					</code>
				</CollapsibleContent>
			</Collapsible>
				
			<button 
				onClick={toggleUncontrolled} 
				class="px-4 py-2 my-2 border border-blue-500 text-blue-500 font-bold rounded"
			>
				Toggle Uncontrolled ↑
			</button>
		</>
	);
}

export default App;

