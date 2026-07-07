import graphviz
import os

def generate_architecture_diagram():
    dot = graphviz.Digraph('VeritasAI_Architecture', comment='Veritas AI System Architecture', format='png')
    dot.attr(rankdir='LR', splines='ortho')
    dot.attr('node', shape='box', style='filled', fillcolor='lightblue', fontname='Helvetica')

    # Frontend Cluster
    with dot.subgraph(name='cluster_frontend') as c:
        c.attr(style='rounded', bgcolor='whitesmoke', label='Frontend (React/Vite)')
        c.node('SP', 'Student Portal\n(React Router)')
        c.node('PP', 'Professor Dashboard\n(React Router)')
        c.node('AP', 'Admin Portal\n(React Router)')

    # Backend Cluster
    with dot.subgraph(name='cluster_backend') as c:
        c.attr(style='rounded', bgcolor='#f9f9f9', label='Backend (Node.js/Express)')
        c.node('API', 'Express API\n(/api/submissions)')
        c.node('DB', 'In-Memory State\n(Submissions Array)')
        
    # External Services
    with dot.subgraph(name='cluster_external') as c:
        c.attr(style='rounded,dashed', bgcolor='white', label='External Services')
        c.node('GROQ', 'Groq API\n(llama3-8b-8192)', fillcolor='#ffcc99')

    # Edges
    dot.edge('SP', 'API', label=' POST (Submit Essay)')
    dot.edge('PP', 'API', label=' GET (Fetch Data)')
    dot.edge('PP', 'API', label=' PUT (Intervene)')
    dot.edge('AP', 'API', label=' GET (Analytics)')
    
    dot.edge('API', 'DB', label=' Read/Write')
    dot.edge('API', 'GROQ', label=' Analyze Text\n(Prompt + JSON schema)')
    dot.edge('GROQ', 'API', label=' Return AI Score,\nFlags, Rationale')

    output_path = dot.render('architecture_diagram', view=False)
    print(f"Generated Architecture Diagram: {output_path}")

def generate_workflow_diagram():
    dot = graphviz.Digraph('VeritasAI_Workflow', comment='Pedagogical Intervention Workflow', format='png')
    dot.attr(rankdir='TB')
    
    dot.node('Start', 'Student writes & submits essay\n(Discloses AI usage optionally)', shape='ellipse', fillcolor='lightgreen', style='filled')
    dot.node('Backend', 'Node.js Backend receives submission', shape='box')
    dot.node('Groq', 'Groq API analyzes text\n(Stylometry, Citation Hallucinations)', shape='hexagon', fillcolor='#ffcc99', style='filled')
    
    dot.node('Decision', 'Is AI Score High or\nHallucination Detected?', shape='diamond', fillcolor='lightyellow', style='filled')
    
    dot.node('Flagged', 'Status: Flagged\nAdded to Triage Queue', shape='box', fillcolor='salmon', style='filled')
    dot.node('Cleared', 'Status: Cleared\nNormal Grading Flow', shape='box', fillcolor='lightgreen', style='filled')
    
    dot.node('Review', 'Professor reviews AI Rationale\n& Highlighted Passages', shape='box', fillcolor='lightblue', style='filled')
    
    dot.node('Intervention', 'Pedagogical Intervention\n(Request Revision or Oral Defense)', shape='box', fillcolor='lightblue', style='filled')
    dot.node('StudentInbox', 'Student receives feedback\nin Student Portal', shape='box')
    dot.node('Revise', 'Student Revises or Appeals', shape='ellipse', fillcolor='lightgray', style='filled')

    dot.edge('Start', 'Backend')
    dot.edge('Backend', 'Groq')
    dot.edge('Groq', 'Decision')
    
    dot.edge('Decision', 'Flagged', label=' Yes')
    dot.edge('Decision', 'Cleared', label=' No')
    
    dot.edge('Flagged', 'Review')
    dot.edge('Review', 'Intervention')
    dot.edge('Intervention', 'StudentInbox')
    dot.edge('StudentInbox', 'Revise')
    dot.edge('Revise', 'Backend', label=' Resubmit')

    output_path = dot.render('workflow_diagram', view=False)
    print(f"Generated Workflow Diagram: {output_path}")

if __name__ == '__main__':
    try:
        generate_architecture_diagram()
        generate_workflow_diagram()
        print("Successfully generated all Graphviz flowcharts.")
    except graphviz.backend.execute.ExecutableNotFound:
        print("\nERROR: Graphviz system executable not found!")
        print("Please install Graphviz on your system (e.g., 'winget install graphviz' or download from graphviz.org) and ensure it's in your PATH.")
