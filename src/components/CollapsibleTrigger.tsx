import { ComponentProps, createEffect, createSignal, JSXElement, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { useCollapsibleContext } from "./context/collapsibleContext";
import { ElementType } from "../types";

type CollapsibleTriggerProps<C extends ElementType> = {
	as: C;
	children: JSXElement;
} & ComponentProps<C>;

export function CollapsibleTrigger<C extends ElementType>(props: CollapsibleTriggerProps<C>) {
	const [local, rest] = splitProps(props, ["as", "children"]);

	const {isOpened, toggle, collapsibleId, setTriggerRef} = useCollapsibleContext();
	const [label, setLabel] = createSignal(isOpened() ? 'Close' : 'Open');
	
	createEffect(() => {
		setLabel(isOpened() ? 'Close' : 'Open');
	});

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.code === "Enter" || e.code === "Space") {
			e.preventDefault();
			toggle();
		}
	};

	const Component = local.as || 'button';

	return (
		<Dynamic
			aria-controls={`collapsible-content-${collapsibleId()}`}
			aria-expanded={isOpened()}
			aria-label={label()}
			class="collapsible__trigger"
			component={Component}
			data-state={isOpened() ? 'open' : 'close'} // exposing API for styling and animations
			id={`collapsible-trigger-${collapsibleId()}`}
			onClick={toggle}
			onKeyDown={handleKeyDown}
			ref={setTriggerRef}
			role="button"
			tabIndex={0}
			{...rest}
		>
			{local.children ?? label()}
		</Dynamic>
	);
};