import { Accessor, createContext, useContext, Setter, JSXElement } from "solid-js";

interface CollapsibleContextValue {
	isOpened: Accessor<boolean>;
    setIsOpened: (newValue: boolean) => void;
	toggle: () => void;
    collapsibleId: Accessor<string>;
    setCollapsibleId: Setter<string>;
	contentRef: Accessor<JSXElement>;
	setContentRef: Setter<JSXElement>;
	triggerRef: Accessor<JSXElement>;
	setTriggerRef: Setter<JSXElement>;
}

export const CollapsibleContext = createContext<CollapsibleContextValue>();

export const useCollapsibleContext = () => {
	const context = useContext(CollapsibleContext);

	if (!context) {
		throw new Error('useCollapsible must be used within an CollapsibleContext');
	}
	return context;
};