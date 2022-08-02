import {ModelProperties} from "../compiler.t";
import JSONPath from "jsonpath";

/*
<xsd:complexType name="tDMNElement">
	<xsd:sequence>
		<xsd:element name="description" type="xsd:string" minOccurs="0" maxOccurs="1"/>
		<xsd:element name="extensionElements" minOccurs="0" maxOccurs="1">
			<xsd:complexType>
				<xsd:sequence>
					<xsd:any namespace="##other" processContents="lax" minOccurs="0" maxOccurs="unbounded"/>
				</xsd:sequence>
			</xsd:complexType>
		</xsd:element>
	</xsd:sequence>
	<xsd:attribute name="id" type="xsd:ID" use="optional"/>
	<xsd:attribute name="label" type="xsd:string" use="optional"/>
	<xsd:anyAttribute namespace="##other" processContents="lax"/>
</xsd:complexType>
 */
export abstract class DMNElement {
	id: string | undefined;
	description: string | undefined;

	readonly raw: any;
	readonly properties: ModelProperties;

	protected constructor(raw: any, properties: ModelProperties) {
		this.raw = raw;
		this.properties = properties;

		this.construct();
	}

	// TODO: nur das aktualisieren, was auch geändert wurde? anhand des paths?
	public construct() {
		this.id = JSONPath.value(this.raw, DMN_ELEMENT_ID_PATH);
		this.description = JSONPath.value(this.raw, DMN_ELEMENT_DESCRIPTION_PATH);
	}
}

export const DMN_ELEMENT_ID_PATH = "$._.id";
export const DMN_ELEMENT_DESCRIPTION_PATH = "$._.description";
