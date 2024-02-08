<form method="POST" action="{{ route('complete.registration') }}">
    @csrf
    <input type="hidden" name="name" value="{{ $googleUser->name }}">
    <input type="hidden" name="email" value="{{ $googleUser->email }}">
    <input type="hidden" name="google_id" value="{{ $googleUser->id }}">
    <input type="hidden" name="password" value="{{ $googleUser->password }}">
    <label for="phone">Phone Number:</label>
    <input type="text" name="phone" id="phone" required>
    <button type="submit">Complete Registration</button>
</form>
