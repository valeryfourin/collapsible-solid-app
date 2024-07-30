import { ComponentProps, JSXElement, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { useCollapsibleContext } from "./context/collapsibleContext";
import { ElementType } from "../types";

type CollapsibleContentProps<C extends ElementType> = {
	as: C;
	children: JSXElement;
} & ComponentProps<C>;

export function CollapsibleContent<C extends ElementType>(props: CollapsibleContentProps<C>) {
	const [local, restProps] = splitProps(props, ["as", "children"]);

	const { isOpened, collapsibleId, setContentRef } = useCollapsibleContext();
	const Component = local.as || 'div';

	return (
		<Dynamic
			aria-label="Toggle content"
			aria-labelledby={`collapsible-trigger-${collapsibleId()}`}
			class="collapsible__content"
			component={Component}
			data-state={isOpened() ? 'open' : 'close'} // exposing API for styling and animations
			id={`collapsible-content-${collapsibleId()}`}
			ref={setContentRef}
			{...restProps}
		>
			{isOpened() && local.children}
		</Dynamic>
	);
}