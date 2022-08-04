import {DMNElement} from "./DMNElement";
import {ModelProperties} from "../compiler.t";
import JSONPath from "jsonpath";

/*
<xsd:complexType name="tNamedElement">
	<xsd:complexContent>
		<xsd:extension base="tDMNElement">
			<xsd:attribute name="name" type="xsd:string" use="required"/>
		</xsd:extension>
	</xsd:complexContent>
</xsd:complexType>
 */
export abstract class NamedElement extends DMNElement {
	// @ts-ignore
	name: string;

	protected constructor(raw: any, properties: ModelProperties) {
		super(raw, properties);

		this.construct();
	}

	public construct() {
		super.construct();
		this.name = JSONPath.value(this.raw, JSONPath.stringify(["$", "_", "name"]));
	}
}
