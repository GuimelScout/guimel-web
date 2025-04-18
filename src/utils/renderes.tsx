import Heading from "@/shared/Heading";
import Heading2 from "@/shared/Heading2";
import { DocumentRendererProps } from "@keystone-6/document-renderer";

const renderers: DocumentRendererProps['renderers'] = {
  inline: {
    bold: ({ children }) => {
      return <strong>{children}</strong>;
    },
  },
  block: {
    paragraph: ({ children, textAlign }) => {
      return <p style={{ textAlign }}>{children}</p>;
    },
    heading: ({ children, textAlign, level }) => {
      return <Heading level={level} style={{ textAlign }} desc="">{children}</Heading>;
    },
    list: ({ children, type }) => {
      return type === 'unordered' ? (
        <ul style={{listStyleType:'disc', marginLeft:20}}>{children.map((child, index) => <li key={index}>{child}</li>)}</ul>
      ) : (
        <ol style={{listStyleType:'decimal', marginLeft:20}}>{children.map((child, index) => <li key={index}>{child}</li>)}</ol>
      );
    }
  },
};

export default renderers;
