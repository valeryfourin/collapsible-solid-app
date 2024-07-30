import { ComponentProps, createSignal, splitProps, onMount, JSXElement, Setter } from "solid-js";
import { Dynamic } from "solid-js/web";
import { CollapsibleContext } from "./context/collapsibleContext";
import { generateUniqueId } from "../utils/generateUniqueId";
import { useCollapsible } from "./hooks/useCollapsible";
import { ElementType } from "../types";
import { CollapsibleApi } from "./types";

type CollapsibleProps<C extends ElementType> = {
	as: C;
	children: JSXElement;
	isOpened?: boolean;
	onToggle?: (isOpened: boolean) => void;
	ref: Setter<CollapsibleApi | undefined>;
} & ComponentProps<C>;

export function Collapsible<C extends ElementType>(props: CollapsibleProps<C>) {
	const [local, restProps] = splitProps(props, ["as", "children", "isOpened", "onToggle", "ref"]);

	const { isOpened, setIsOpened, toggle } = useCollapsible({
		value: local.isOpened,
		onToggle: local.onToggle
	});

	onMount(() => {
		props.ref?.({ isOpened, setIsOpened, toggle }); // exposing collapsible API
	});

	const [collapsibleId, setCollapsibleId] = createSignal(generateUniqueId());
	const [contentRef, setContentRef] = createSignal<JSXElement>();
	const [triggerRef, setTriggerRef] = createSignal<JSXElement>();
	
	const Component = local.as || 'div';

	return (
		<CollapsibleContext.Provider value={{
			isOpened,
			setIsOpened,
			toggle,
			collapsibleId,
			setCollapsibleId,
			contentRef,
			setContentRef,
			triggerRef,
			setTriggerRef
		}}>
			<Dynamic
				class="collapsible"
				component={Component}
				data-state={isOpened() ? 'open' : 'close'} // exposing API for styling and animations
				{...restProps}
			>{local.children}</Dynamic>
		</CollapsibleContext.Provider>
	);
}
