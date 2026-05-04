import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import {
  AuthResponse,
  PaginatedUsersResponse,
  RegisterUserDto,
  User,
  UpdateUserResponse,
} from '../../domain/interfaces/user.interface';
import { AdminMapper } from '../../infrastructure/mappers/admin.mapper';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private http = inject(HttpClient);
  private baseUrl = environment.urlApi;

  getUsers(page: number = 1, limit: number = 10): Observable<PaginatedUsersResponse> {
    let params = new HttpParams().set('page', page.toString()).set('limit', limit.toString());

    return this.http
      .get<PaginatedUsersResponse>(`${this.baseUrl}/admin/getusers`, { params })
      .pipe(map((response) => AdminMapper.mapPaginatedUsers(response)));
  }

  registerUser(userData: RegisterUserDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/admin/register`, userData);
  }

  deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(`${this.baseUrl}/admin/users/${id}`);
  }

  updateUser(id: string, userData: Partial<RegisterUserDto>): Observable<UpdateUserResponse> {
    return this.http.put<UpdateUserResponse>(`${this.baseUrl}/admin/users/${id}`, userData);
  }
}
