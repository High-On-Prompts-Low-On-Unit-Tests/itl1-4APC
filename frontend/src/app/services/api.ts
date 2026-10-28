import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Team {
  id?: number;
  name: string;
  klasse: string;
}

export interface Project {
  id?: number;
  teamId: number;
  titel: string;
  beschreibung?: string;
  praesentiertAm: string;
  Team?: Team;
}

export interface DurchschnittEintrag {
  criterionId: number;
  durchschnitt: string;
  Criterion?: { name: string };
}

@Service()
export class Api {
  private url = environment.apiUrl;
  private http = inject(HttpClient);

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.url}/projects`);
  }

  getProject(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.url}/projects/${id}`);
  }

  getDurchschnitt(projectId: number): Observable<DurchschnittEintrag[]> {
    return this.http.get<DurchschnittEintrag[]>(`${this.url}/projects/${projectId}/durchschnitt`);
  }
}
