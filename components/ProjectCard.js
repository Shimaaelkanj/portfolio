import Image from "next/image";
import { ARCH_DIAGRAM, RAG_DIAGRAM } from "../data/diagrams";

const hasItems = (list) => Array.isArray(list) && list.length > 0;

function Block({ b }) {
  return (
    <>
      <h4>{b.heading}</h4>
      {(b.paragraphs || []).map((text, i) => (
        <p className="blockp" key={i}>{text}</p>
      ))}
      {b.table && (
        <div
          className="table-scroll"
          tabIndex={0}
          role="region"
          aria-label={b.heading + " (scrollable table)"}
        >
          <table className="data">
            <thead>
              <tr>
                {b.table.head.map((h, i) => (
                  <th scope="col" key={i}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.table.rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) =>
                    ci === 0 ? (
                      <th scope="row" key={ci}>{cell}</th>
                    ) : (
                      <td key={ci}>{cell}</td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
            {b.table.caption && <caption>{b.table.caption}</caption>}
          </table>
        </div>
      )}
      {(b.after || []).map((text, i) => (
        <p className="blockp" key={"after-" + i}>{text}</p>
      ))}
    </>
  );
}

export default function ProjectCard({ p }) {
  const diagramSvg = p.diagram === "ragDiagram" ? RAG_DIAGRAM : ARCH_DIAGRAM;

  return (
    <article className={"project" + (p.featured ? " featured" : "")}>
      <h3>{p.title}</h3>
      <p className={p.featured ? "pitch" : undefined}>{p.description}</p>

      {hasItems(p.stats) && (
        <div className="stats">
          {p.stats.map(([value, label]) => (
            <div className="stat" key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      )}

      {p.note && <p className="note">{p.note}</p>}

      {p.diagram && (
        <figure className="diagram">
          <div
            className="diagram-scroll"
            tabIndex={0}
            role="region"
            aria-label="Architecture diagram (scrollable)"
            dangerouslySetInnerHTML={{ __html: diagramSvg }}
          />
          {p.diagramCaption && <figcaption>{p.diagramCaption}</figcaption>}
        </figure>
      )}

      {(p.blocks || []).map((b) => (
        <Block b={b} key={b.heading} />
      ))}

      {hasItems(p.flow) && (
        <>
          <h4>How a task flows</h4>
          <ol className="flow">
            {p.flow.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </>
      )}

      {hasItems(p.highlights) && (
        <>
          <h4>What I built</h4>
          <ul className="points">
            {p.highlights.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </>
      )}

      {hasItems(p.images) && (
        <>
          <h4>Screens</h4>
          <div className="gallery">
            {p.images.map((im) => (
              <figure key={im.src}>
                <Image
                  src={im.src}
                  alt={im.alt}
                  width={im.width}
                  height={im.height}
                  sizes="(max-width: 640px) 100vw, 460px"
                />
                {im.caption && <figcaption>{im.caption}</figcaption>}
              </figure>
            ))}
          </div>
        </>
      )}

      {hasItems(p.tags) && (
        <div className="tags">
          {p.tags.map((tag) => (
            <span className="tag" key={tag}>{tag}</span>
          ))}
        </div>
      )}

      <div className="links">
        {p.github && (
          <a href={p.github} target="_blank" rel="noopener noreferrer">Code</a>
        )}
        {p.demo && (
          <a href={p.demo} target="_blank" rel="noopener noreferrer">Live demo</a>
        )}
      </div>
    </article>
  );
}
